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
				const response = await fetch("https://urban-space-engine-5g4xxg5rq4gqfxgv-3001.app.github.dev/api/signup", {
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
				const response = await fetch("https://urban-space-engine-5g4xxg5rq4gqfxgv-3001.app.github.dev/api/login", {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
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
				setStore({ accessToken: data.token });
				localStorage.setItem("accessToken", data.token);
				return true;
			},

			privateLink: async () => {
				const token = localStorage.getItem('accessToken')
				if (!token) {
					throw Error("User not logged in!")
				}
				const response = await fetch('https://urban-space-engine-5g4xxg5rq4gqfxgv-3000.app.github.dev/private', {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						'Authorization': 'Bearer ' + token
					}
				})
				if (response.ok) {
					const data = await response.json()
					return data
				} else if (response.status === 403) {
					throw Error("Missing or invalid token")
				} else {
					throw Error("Error: " + response.statusText)
				}
			},

			logout: async () => {
				setStore({ accessToken: null })
				localStorage.removeItem("accessToken")
				console.log("User logged out successfully")
			}
		}
	};
};

export default getState;
