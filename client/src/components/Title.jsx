import React from 'react'

const Title = ({ title, subTitle, align = "center", font }) => {
  return (
    <div
      className={`flex flex-col justify-center text-center px-4
        ${align === "left" ? "md:items-start md:text-left" : "items-center"}
      `}
    >
      <h1
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold 
          ${font || "font-playfair"} break-words w-full max-w-3xl`}
      >
        {title}
      </h1>
      <p className="text-sm sm:text-base text-gray-500/90 mt-2 max-w-2xl">
        {subTitle}
      </p>
    </div>
  );
};

// const Title = ({title, subTitle, align, font}) => {
//   return (

//     <div className={`flex flex-col justify-center items-center text-center ${align === "left" && "md:items-start md:text-left"}`}>
//         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-semibold text-center">{title}</h1>
//       {/* <h1 className={`text-4xl md:text-[40px] ${font || "font-playfair"}`}>{title}</h1> */}
//       <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>{subTitle}</p>
//     </div>
    
//   )
// }

export default Title
