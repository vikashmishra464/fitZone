export const members = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch("http://localhost:5000/membersdetails", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
