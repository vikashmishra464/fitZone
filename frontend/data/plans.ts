export const plans=async()=>{
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plans`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };
