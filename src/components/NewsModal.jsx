import React from "react";
import { MoveUpRight } from "lucide-react";

const NewsModal = ({ article }) => {
  const { source, title, description, url, publishedAt } = article;
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const images = [
    'https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638886301/EducationHub/photos/lightning-bolts.jpg',
    'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg',
    'https://images.pexels.com/photos/76969/cold-front-warm-front-hurricane-felix-76969.jpeg',
    'https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg',
    'https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg',
    'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
    'https://images.pexels.com/photos/2422497/pexels-photo-2422497.jpeg',
  ]

  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div className="max-w-2xl w-full lg:flex relative ">
      <a href={url} target="_blank" rel="noreferrer">
        <button className="p-1 border-2 rounded-full absolute top-2 right-2">
          <MoveUpRight size={15}/>
        </button>
      </a>
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-xl lg:rounded-r text-center overflow-hidden"
        style={{
          backgroundImage: `url(${randomImage})`,
        }}
        title="Woman holding a mug"
      ></div>
      <div className="border-r w-full rounded-xl border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white lg:rounded-l p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-black font-bold text-xl mb-2">{title}</div>
          <p className="text-grey-darker text-base">{description}</p>
        </div>
        <div className="flex items-center">
          <div className="text-sm flex justify-between w-full">
            <p className="text-black leading-none">Source: {source.id}</p>
            <p className="text-grey-dark">
              Published: {formatDate(publishedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
