function getCsrf(): string {
  return document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? "";
}

export async function postForm(url: string, data: FormData | URLSearchParams): Promise<any> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "X-CSRFToken": getCsrf() },
    body: data,
  });
  return res.json();
}
