// chcek wheather it is localhost or vercel

export const checkDomain = () => {
    const domain = process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.VERCEL_URL;
    return domain;
};

