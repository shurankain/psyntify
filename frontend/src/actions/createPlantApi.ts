export async function createPlantApi(formData: FormData, token: string) {
  const res = await fetch("/plants", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to create plant via API");
  }
}
