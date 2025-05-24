import React from "react";

type ListingCardProps = {
  title: string;
  price: string | number;
  condition: string;
  university: string;
  imageUrl?: string;
};

const ListingCard: React.FC<ListingCardProps> = ({
  title,
  price,
  condition,
  university,
  imageUrl,
}) => (
  <div className="bg-white rounded-md shadow p-4 flex flex-col gap-2">
    {imageUrl && (
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover rounded mb-2"
      />
    )}
    <div className="font-bold text-lg">{title}</div>
    <div className="text-blue-600 font-semibold">৳{price}</div>
    <div className="text-sm text-gray-600">Condition: {condition}</div>
    <div className="text-xs text-gray-400">{university}</div>
  </div>
);

export default ListingCard;
