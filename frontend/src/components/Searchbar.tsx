import { FormikProps } from "formik";
import React, { FC } from "react";
import { FaSearch } from "react-icons/fa";

type SearchbarProps = {
  searchForm: FormikProps<{ search: string }>;
};

const Searchbar: FC<SearchbarProps> = ({ searchForm }) => {
  return (
    <div className="border-2 rounded-md w-auto flex items-center pr-2 mx-2 max-h-16">
      <input
        type="text"
        onChange={(event) => {
          searchForm.setFieldValue("search", event.target.value);
        }}
        value={searchForm.values.search}
        className="bg-transparent text-white outline-none pl-2 py-4 flex-grow"
        placeholder="Search..."
      />
      <FaSearch className="text-white"/>
    </div>
  );
};

export default Searchbar;
