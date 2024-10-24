const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			login: async (userData) => {
				try {
					const response = await fetch('https://crispy-space-dollop-g457746rqxwx2wxg-3001.app.github.dev/signup', {
						method: 'POST',
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(userData)
					})
					if (!response.ok) throw Error("There was a problem in the login request")

					if (response.status === 401) {
						throw ("Invalid credentials")
					}
					else if (response.status === 400) {
						throw ("Invalid email or password format")
					}
					const data = await response.json()
					console.log(data)
					localStorage.setItem("jwt-token", data.token)
					return data
				} catch (error) {
					console.error("Error", error)
				}
			},

			logout: async () => {

			}
		}
	};
};

export default getState;
