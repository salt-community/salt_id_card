import { ChangeEvent, useRef, useState } from "react";
import { CtaButton } from "../button";
import { Card } from "../card";
import { Form } from "../form";
import html2canvas from "html2canvas";
import "./idCardGenerator.css";

export const IdCardGenerator = () => {
  const [input, setInput] = useState({
    name: "",
    startDate: "",
    course: "jfs-sthlm",
    photo: "https://placehold.co/140x140",
  });
  const printRef = useRef<HTMLInputElement>(null);

  const inputForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setInput({
        ...input,
        ["photo"]: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handlePrint = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element!, {
      scale: 4,
    });

    const data = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = data;
    link.download = `${input.name}.png`;

    document.body.appendChild(link);
    const style = document.createElement("style");
    style.sheet?.insertRule(
      "body > div:last-child img { display: inline-block; }"
    );
    link.click();
    document.body.removeChild(link);
  };

  const isFormValid = () => {
    console.log(input.name, input.course, input.startDate);
    return input.name === "" || input.startDate === "";
  };
  return (
    <>
      <div className="form-container">
        <Form
          onChange={(e) => inputForm(e)}
          handlePhoto={(e) => handlePhoto(e)}
        />
        <CtaButton onClick={handlePrint} disabled={isFormValid()}>
          Create card
        </CtaButton>
      </div>
      <div className="card-container">
        <div ref={printRef} className="card-print">
          <Card input={input} />
        </div>
      </div>
    </>
  );
};
