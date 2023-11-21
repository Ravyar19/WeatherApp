import React, { useState } from "react";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const FormPage = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  const { mutate } = useMutation(
    async () => {
      console.log(`Fetching data for ${city}`);
    },
    {
      onSuccess: () => {
        navigate(`/data/${city}`);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#071952] !text-white  ">
      <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
        <h1 className="text-2xl text-center mb-4">Enter City Name</h1>
        <Input
          placeholder="City name"
          className="w-[400px] h-[50px]  "
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <Button className="w-[400px] h-[50px] bg-green-500 " type="primary ">
          Primary
        </Button>
      </form>
    </div>
  );
};

export default FormPage;
