const getUser = async (token: string) => {
    try {
        const response = await fetch(`http://localhost:8080/users/me`, {
            headers: {
                'Cache-Control': 'no-cache',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};
const getBoard = async (token: string) => {
    try {
        const response = await fetch('http://localhost:8080/boards', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};
export { getUser, getBoard };
