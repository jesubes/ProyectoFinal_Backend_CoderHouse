const recoverPasswordForm = document.getElementById("recoverPasswordForm");
const token = window.location.pathname.split("/")[2];
recoverPasswordForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const entries = Object.fromEntries(new FormData(recoverPasswordForm));
  const data = {...entries, token};
  fetch(`/api/session/recoverPassword/${token}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        recoverPasswordForm.firstChild.textContent = `${res.error}`;
        return console.log(res.error);
      } else {
        return location.assign("http://localhost:8080/login");
      }
    });
});
