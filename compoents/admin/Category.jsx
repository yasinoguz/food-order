import React, { useEffect } from "react";
import Title from "../../ui/title";
import { useState } from "react";
import Input from "../Input";
import axios, { AxiosHeaders } from "axios";

function Category() {
  const [categories, setCategories] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        setCategories(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const handleCreate = async (e) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        { title: inputText }
      );
      setCategories([...categories, res.data]);
      setInputText("");
    } catch (err) {
      console.log(err);
    }
  };

  const handledelete = async (e, id) => {
    try {
      if (confirm("aru you sure to delete this category")) {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
        );
      }
      setCategories(categories.filter((cat) => cat._id !== id));
      console.log(categories);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-4">
      <Title addClaInputss="text-[38px]">Category</Title>
      <div className="mt-5">
        <div className="flex gap-3 flex-1 items-center">
          <Input
            placeholder="Add a new Category..."
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          />
          <button
            className="btn-primary"
            onClick={() => {
              handleCreate();
            }}
          >
            Add
          </button>
        </div>
        <div className="mt-9">
          {categories.map((category) => (
            <div className="flex justify-between mt-4" key={category._id}>
              <b className="text-xl">{category.title}</b>
              <button
                className="btn-primary !bg-danger"
                onClick={(e) => handledelete(e, category._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
