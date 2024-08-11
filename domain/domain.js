// chcek wheather it is localhost or vercel

export const checkDomain = () => {
    const domain = process.env.NODE_ENV === "development" ? "https://localhost:3000" : "https://no-idea-seven.vercel.app";
    return domain;
};

