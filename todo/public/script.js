const tasksDom = document.querySelector('.tasks');
const formDom  = document.querySelector(".task-form");
const taskInputDom = document.querySelector('.task-input');
const formAlert = document.querySelector('.form-alert');
// /api/v1/tasksからタスクを読み込む
const showTasks = async() => {
    try {
        //自作のAPIを叩く
        const {data: tasks} = await axios.get("/api/v1/tasks");

        //タスクが1つもないとき
        if(tasks.length < 1) {
            tasksDom.innerHTML = `<h5 class ="empty-list">タスクがありません</h5>`;
            return;
        }

        //タスクを出力
        const allTasks = tasks.map((task) => {
            const {completed, _id,name} = task;
            return `<div class="single-task ${completed && "task-completed"}">
            <h5><span><i class="fa fa-check-circle"></i></span>${name}</h5>
            <div class="task-links">
                <a href="edit.html?id=${_id}" class="edit-link">
                    <i class="fas fa-edit"></i>
                </a>
                <!-- ゴミ箱リンク -->
                <button type="button" class="delete-btn" data-id=${_id}>
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>`;
        }).join("");
        tasksDom.innerHTML = allTasks;
    }catch(err) {
        console.log(err);
    }
}
showTasks();

//タスクを新規作成
formDom.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = taskInputDom.value;

    try {
        await axios.post("/api/v1/tasks",{name:name});
        showTasks();
        taskInputDom.value = ""
        formAlert.style.display = "block";
        formAlert.textContent = "タスクを追加しました"
        formAlert.classList.add("text-success");
    }catch(err) {
        formAlert.style.display = "block";
        formAlert.classList.remove("text-success");
        formAlert.innerHTML = "無効ですもう一度やり直してください"
    }setTimeout(() => {
        formAlert.style.display = "none"
    },3000)
})

tasksDom.addEventListener('click',async(e) => {
    const element = e.target;
    if(element.parentElement.classList.contains("delete-btn")) {
        const id = element.parentElement.dataset.id;
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        }catch(err) {
            console.log(err);
        }
    }
});