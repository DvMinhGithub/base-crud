export const setTokensInCookie = (
  accessToken: string,
  refreshToken: string
) => {
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toUTCString(), // 1 week
  };
  document.cookie = `access_token=${accessToken}; ${cookieOptions}`;
  document.cookie = `refresh_token=${refreshToken}; ${cookieOptions}`;
  document.cookie = `token=${{ accessToken, refreshToken }}; ${cookieOptions}`;
};

export const removeTokensFromCookie = () => {
  document.cookie = "access_token=; path=/;";
  document.cookie = "refresh_token=; path=/;";
};

export const getCookieValue = (name: string): string | null => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};
