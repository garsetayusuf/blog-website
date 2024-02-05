/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import styles from "@/styles/user.module.css";
import { useGetAllUser } from "@/redux/hooks/userHook";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/defaultHooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  setMode,
  setShowModal,
  setUserId,
  setUsersSearch,
} from "@/redux/slices/userSlice";
import { getUserById } from "@/api/userApi";
import { setFormData } from "@/redux/slices/formSlice";
import React, { useEffect, useRef } from "react";
import { debounce } from "@/plugin/debounce";
import { setTotalPage } from "@/redux/slices/paginatorSlice";
import Pagination from "../ui/pagination";
import { RotatingLines } from "react-loader-spinner";
import Modal from "../ui/modal/modal";

const UserData = () => {
  const dispatch = useAppDispatch();
  const { fetchData } = useGetAllUser();
  const initialized = useRef(false);
  const { users, usersSearch, loading } = useAppSelector((state) => state.user);
  const { currentPage, currentSize } = useAppSelector(
    (state) => state.paginator
  );

  useEffect(() => {
    if (!initialized.current) {
      fetchData();
      initialized.current = true;
    }

    // Calculate start and end indices for slicing the array
    const startIndex = (currentPage - 1) * currentSize;
    const endIndex = currentPage * currentSize;

    // Get the data for the current page
    const data = users.slice(startIndex, endIndex);
    dispatch(setUsersSearch(data));
  }, [users, currentPage, currentSize, dispatch]);

  const handleUpdate = async (id: any) => {
    dispatch(setUserId(id));
    const response = await getUserById(id);

    if (response.status === 200) {
      dispatch(setFormData(response.data));
      dispatch(setShowModal(true));
      dispatch(setMode("update"));
    }
  };

  const handleDelete = (id: any) => {
    dispatch(setUserId(id));
    dispatch(setShowModal(true));
    dispatch(setMode("delete"));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    delayedSearch(value);
  };

  const delayedSearch = debounce((value: string) => {
    if (value.trim() === "") {
      dispatch(setUsersSearch(users));
      dispatch(setTotalPage(users.length));
    } else {
      const results = users.filter(
        (user) =>
          user.name.toLowerCase().includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase())
      );

      dispatch(setUsersSearch(results));
      dispatch(setTotalPage(results.length));
    }
  }, 1000);

  return (
    <div className="max-sm:p-5 p-8">
      <Modal />
      <div className="flex justify-between items-center gap-1">
        <button
          onClick={() => (
            dispatch(setShowModal(true)), dispatch(setMode("create"))
          )}
          disabled={loading}
          className="py-5 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:bg-green-200 hover:text-green-800 h-9 rounded-md px-3"
        >
          <Icon
            icon="flowbite:user-add-outline"
            width="25"
            height="25"
            className="text-green-600"
          />
          <p>Add User</p>
        </button>

        <div className="space-y-2">
          <input
            disabled={loading}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:outline-[#1890FF] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search name or email"
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <RotatingLines
            visible={true}
            width="96"
            strokeColor="#1890FF"
            strokeWidth="3"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      ) : (
        <>
          <div className="relative w-full overflow-auto my-5">
            <table className="caption-bottom text-sm w-full">
              <thead>
                <tr className="border-b transition-colors">
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Name
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Email
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Gender
                  </th>
                  <th className="h-12 px-4 text-center align-middle font-medium">
                    Status
                  </th>
                  <th className="h-12 px-4 text-center align-middle font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersSearch &&
                  usersSearch.map((item: any) => {
                    return (
                      <tr
                        key={item.id}
                        className="border-b transition-colors hover:bg-gray-100"
                      >
                        <td className="p-3 align-middle font-medium">
                          {item.name}
                        </td>
                        <td className="p-3 align-middle">{item.email}</td>
                        <td className="p-3 align-middle">{item.gender}</td>
                        <td className="p-3 align-middle text-center">
                          <span
                            className={`px-2 py-1 ${
                              item.status.toLowerCase() === "active"
                                ? "bg-green-200 text-green-800"
                                : "bg-red-200 text-red-800"
                            } rounded-md`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3 align-middle">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleUpdate(item.id)}
                              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:bg-orange-200 h-9 rounded-md px-3"
                            >
                              <Icon
                                icon="flowbite:edit-outline"
                                width="25"
                                height="25"
                                className="text-yellow-600"
                              />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:bg-red-200 h-9 rounded-md px-3"
                            >
                              <Icon
                                icon="flowbite:trash-bin-outline"
                                width="25"
                                height="25"
                                className="text-red-600"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <Pagination />
        </>
      )}
    </div>
  );
};

export default UserData;