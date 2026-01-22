import React from "react";

interface Title {
  title: string;
  subTitle: string;
}
const Title = ({ title, subTitle }: Title) => {
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h1 className="text-primary font-medium text-3xl">{title}</h1>
      <p className="text-sm text-secondary">{subTitle}</p>
    </div>
  );
};

export default Title;
