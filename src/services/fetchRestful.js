export const fetchRestful = async({
    endpoint,
    method,
    body, 
    token
}) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/${endpoint}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `${token}` })
        },
        ...body && { body: JSON.stringify(body) }
    });
    const data = await response.json();
    console.log(data)
    return data;
}