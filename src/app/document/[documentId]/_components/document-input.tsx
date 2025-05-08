import { BsCloudCheck } from "react-icons/bs";
export const DocumentInput = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg px-1.5 truncate cursor-pointer">
        Unititled document
      </span>
      <BsCloudCheck />
    </div>
  );
};
