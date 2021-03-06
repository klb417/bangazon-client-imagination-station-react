const remoteURL = "http://localhost:8000";

export default {
  async getOne(route, id) {
    const results = await fetch(`${remoteURL}/${route}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("bangazon_token")}`
      }
    });
    return results.json();
  }, 

  async getAll(route, query_params="") {
    const results = await fetch(`${remoteURL}/${route}${query_params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("bangazon_token")}`
      }
    });
    return results.json();
  },

  async delete(route, id) {
    const results = await fetch(`${remoteURL}/${route}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("bangazon_token")}`
      }
    });
    return results;
  },

  async post(route, newItem) {
    const results = await fetch(`${remoteURL}/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("bangazon_token")}`
      },
      body: JSON.stringify(newItem)
    });
    return results.json();
  },

  async update(route, editedItem, id) {
    const results = await fetch(`${remoteURL}/${route}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("bangazon_token")}`
      },
      body: JSON.stringify(editedItem)
    });
    return results;
  },

  async profile_update(route, editedItem) {
    const results = await fetch(`${remoteURL}/${route}/profile_update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("bangazon_token")}`
      },
      body: JSON.stringify(editedItem)
    });
    return results;
  },

  async patch(route, editedItem, id) {
    const results = await fetch(`${remoteURL}/${route}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("bangazon_token")}`
      },
      body: JSON.stringify(editedItem)
    });
    return results.json();
  }
};
