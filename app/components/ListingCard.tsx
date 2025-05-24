import React from "react";
import Link from "next/link";

type ListingCardProps = {
  id: number;
  title: string;
  price: string | number;
  condition: string;
  university: string;
  imageUrl?: string;
  category: string;
};

const ListingCard: React.FC<ListingCardProps> = ({
  id,
  title,
  price,
  condition,
  university,
  imageUrl,
  category,
}) => (
  <div className="bg-white rounded-md shadow p-4 flex flex-col gap-2">
    {imageUrl && (
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover rounded mb-2"
      />
    )}
    <Link href="/listings/item-details" passHref legacyBehavior>
      <a className="font-bold text-lg text-blue-700 hover:underline cursor-pointer">
        {title}
      </a>
    </Link>
    <div className="text-blue-600 font-semibold">৳{price}</div>
    <div className="text-sm text-gray-600">Condition: {condition}</div>
    <div className="text-xs text-gray-400">{university}</div>
    <div className="text-xs text-gray-500">Category: {category}</div>
    <Link href="/item-details" passHref legacyBehavior>
      <a className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all text-center block">
        View Details
      </a>
    </Link>
  </div>
);

export default ListingCard;
