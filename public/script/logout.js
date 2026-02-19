const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", async () => {
    
    await fetch("/user/logout").catch(err => console.error("Ann error occur"));
    window.location.href = "/log";
});