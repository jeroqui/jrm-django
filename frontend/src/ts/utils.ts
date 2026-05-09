export function getCsrf(): string {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

export async function postForm(url: string, data: FormData | URLSearchParams): Promise<any> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "X-CSRFToken": getCsrf() },
    body: data,
  });
  return res.json();
}
