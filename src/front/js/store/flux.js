const backendUrl = process.env.BACKEND_URL


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [],
			accessToken: null
		},

		actions: {
			// Use getActions to call a function within a fuction
			signup: async (email, password) => {
				const response = await fetch("https://crispy-space-dollop-g457746rqxwx2wxg-3001.app.github.dev/api/signup", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password })
				})
				if (!response.ok) {
					console.log(response.statusText)
					return false
				}
				return true
			},

			loginUser: async (email, password) => {
				const response = await fetch("https://crispy-space-dollop-g457746rqxwx2wxg-3001.app.github.dev/api/login", {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					},
					body: JSON.stringify({ email, password })
				})
				if (!response.ok) {
					const errorData = await response.json();
					console.error("Error Response:", errorData);
					return false
				}
				const data = await response.json();
				if (!data.token) {
					console.log("No token returned");
					return false;
				}
				console.log(data);
				setStore({ accessToken: data.token });
				localStorage.setItem("accessToken", data.token);
				return true;
			},

			logout: async () => {

			}
		}
	};
};

export default getState;
