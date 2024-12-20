const settingsBtn = document.getElementById("settings_btn");
const statisticBtn = document.getElementById("statistic_btn");

const workBtn = document.getElementById("work_btn");
const relaxBtn = document.getElementById("relax_btn");
const deathBtn = document.getElementById("death_btn");

const countdown = document.getElementById("countdown");
const startBtn = document.getElementById("start_button");

const tasksAdded = document.getElementById("tasks_added");
const taskAdd = document.getElementById("task_add");
const taskAddTextarea = document.getElementById("task_textarea");

//VARIABLES
let timersColors = ["var(--red-clr)", "var(--green-clr)", "var(--blue-clr)"];
let timers = [1500, 300, 900];
let currentTimer = 0;
let time = timers[currentTimer];

let timersRunTime = [0, 0, 0, 0];
let timersStarts = [0, 0, 0];
let timersStops = [0, 0, 0];
let timersFinished = [0, 0, 0];

let pause = true;
let launched = false;

let taskTextInitialValue;

//ADD TASK
taskAdd.addEventListener("click", (e) => {
  let closeAddTaskBtn = e.target.closest("#cancel");
  if (closeAddTaskBtn) return closeAddTask();

  let addTaskBtn = e.target.closest("#add");
  if (addTaskBtn) return addNewTask();

  openAddTask();
});

//OPEN SETTINGS
settingsBtn.addEventListener("click", () => {
  openSettings();
});

//OPEN STATISTIC
statisticBtn.addEventListener("click", () => {
  openStatistic();
});

//CHANGE TIMER
workBtn.addEventListener("click", () => {
  currentTimer = 0;
  changeTimer(currentTimer);
});
relaxBtn.addEventListener("click", () => {
  currentTimer = 1;
  changeTimer(currentTimer);
});
deathBtn.addEventListener("click", () => {
  currentTimer = 2;
  changeTimer(currentTimer);
});

//START STOP TIMER
startBtn.addEventListener("click", () => {
  if (pause) {
    pause = false;
    startBtn.innerText = "ПАУЗА";
    timersStarts[currentTimer]++;
    if (!launched) {
      launched = true;
      setInterval(updateCountdown, 1000);
    }
  } else {
    pause = true;
    startBtn.innerText = "СТАРТ";
    timersStops[currentTimer]++;
  }
});

//SETTINGS
const openSettings = () => {
  //timers in mins and secs
  let timersTimeDisplay = [];
  timersTimeDisplayFunc(timersTimeDisplay);
  //add HTML
  createSetting(timersTimeDisplay);
  //close or save changes
  settings.addEventListener("click", (e) => closeSettings(e));
};

//STATISTIC
const openStatistic = () => {
  //math time
  let timersRunTimeDisplay = [];
  mathStatistic(timersRunTimeDisplay);

  //add HTML
  showStatistic(timersRunTimeDisplay);
};

//MATH TIME CHANGES
const updateCountdown = () => {
  if (pause) return;
  if (time < 0) {
    pause = true;
    launched = false;
    startBtn.innerText = "СТАРТ";
    timerFinished[currentTimer]++;
    return alert("Выполнено!");
  }

  timeDisplay(time);
  timersRunTime[currentTimer]++;
  time--;
};

//DISPLAY TIME
const timeDisplay = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  countdown.innerHTML = `${minutes}:${seconds}`;
};

//CHANGE TIMER
const changeTimer = (currentTimer) => {
  pause = true;
  startBtn.innerText = "СТАРТ";
  time = timers[currentTimer];
  timeDisplay(time);
  document.body.style.backgroundColor = `${timersColors[currentTimer]}`;
  startBtn.style.color = `${timersColors[currentTimer]}`;
};

//OPEN ADD TASK
const openAddTask = () => {
  //change css
  taskAdd.classList.add("task_add_open");
  taskAdd.classList.remove("task_add");
  taskAddTextarea.classList.add("opened_textarea");
  taskAddTextarea.classList.remove("closed_textarea");
  taskAddTextarea.addEventListener("input", function () {
    this.style.height = this.scrollHeight + "px";
  });
  //add focus
  taskAddTextarea.focus();

  //add buttons
  task_add_buttons.innerHTML = `<button id="cancel" type="button">Закрыть</button>
       <button id="add" type="button">Добавить</button>
  </div>`;
};

//CLOSE ADD TASK
const closeAddTask = () => {
  //hide buttons
  task_add_buttons.innerHTML = ``;
  //change css
  taskAdd.classList.add("task_add");
  taskAdd.classList.remove("task_add_open");
  taskAddTextarea.classList.add("closed_textarea");
  taskAddTextarea.classList.remove("opened_textarea");
  taskAddTextarea.style.height = "1.2em";
  taskAddTextarea.value = "";
  return;
};

//ADD NEW TASK
const addNewTask = () => {
  //create new task
  let newTask = document.createElement("div");
  newTask.className = "task_queue";
  newTask.innerHTML = `<textarea class="task_text">${taskAddTextarea.value}</textarea>
          <div class="task_buttons">
          <span class="material-symbols-outlined delete_task"> close
        </span>
          </div>`;
  tasksAdded.appendChild(newTask);
  //cleare textarea
  taskAddTextarea.value = "";
  return closeAddTask();
};

//ADD HTML TO SETTINGS
const createSetting = (timersTimeDisplay) => {
  let settings = document.createElement("div");
  settings.id = "menu";
  settings.innerHTML = `<div id="settings"> 
  <div id="menu_head">
        <h3 class="menu_headline">Настройки</h3>
        <span id="close_setting" class="material-symbols-outlined close_settings">
          close
        </span>
      </div>
      <div id="time_settings">
        <p id="menu_time">Время (минуты)</p>
        <div id="change_time">
          <div class="menu_time">
            <label for="work">Труд</label>
            <input type="number" id="work" name="work" min="1" value="${timersTimeDisplay[0]}"/>
          </div>
          <div class="menu_time">
            <label for="relax">Отдых</label>
            <input type="number" id="relax" name="relax" min="1" value="${timersTimeDisplay[1]}"/>
          </div>
          <div class="menu_time">
            <label for="death">Клин. смерть</label>
            <input type="number" id="death" name="death" min="1" value="${timersTimeDisplay[2]}"/>
          </div>
        </div>
       <button id="change_btn" type="button">Изменить</button>
      </div>
      </div>
    `;
  main.appendChild(settings);
};

const closeSettings = (e) => {
  //close without changes
  let close = e.target.closest("#close_setting");
  if (close) return menu.remove();

  //save changes and close
  let changeBtn = e.target.closest("#change_btn");
  if (changeBtn) {
    let changedCurrentTimer = timers[currentTimer];
    if (work.value != "") timers[0] = work.value * 60;
    if (relax.value != "") timers[1] = relax.value * 60;
    if (death.value != "") timers[2] = death.value * 60;
    if (changedCurrentTimer != timers[currentTimer]) {
      pause = true;
      launched = false;
      startBtn.innerText = "СТАРТ";
      time = timers[currentTimer];
      timeDisplay(time);
    }
    return menu.remove();
  }
};

//MATH TIMES
const timersTimeDisplayFunc = (timersTimeDisplay) => {
  timers.forEach((e) => {
    let minutes = Math.floor(e / 60);
    e = `${minutes}`;
    timersTimeDisplay.push(e);
  });
};

//MATH STATISTIC
const mathStatistic = (timersRunTimeDisplay) => {
  let totalTime = 0;
  timersRunTime.map((item) => (totalTime += item));
  timersRunTime[3] = totalTime;
  timersRunTime.forEach((e) => {
    let minutes = Math.floor(e / 60);
    let seconds = e % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    e = `${minutes}:${seconds}`;
    timersRunTimeDisplay.push(e);
  });
  return timersRunTimeDisplay;
};

//ADD STATISTIC HTML AND CLOSE STATISTIC
const showStatistic = (timersRunTimeDisplay) => {
  let statistic = document.createElement("div");
  statistic.id = "menu";
  statistic.innerHTML = `<div id="menu_head">
        <h3 class="menu_headline">Статистика</h3>
        <span id="close_statistic" class="material-symbols-outlined close_settings">
          close
        </span>
      </div>
      <div id="time_settings">
        <p id="menu_time">Общее время: ${timersRunTimeDisplay[3]}</p>
        <div id="change_time">
          <table class="statistic_table">
            <thead>
              <tr>
                <th></th>
                <th>Труд</th>
                <th>Отдых</th>
                <th>Смерть</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Время</th>
                <td>${timersRunTimeDisplay[0]}</td>
                <td>${timersRunTimeDisplay[1]}</td>
                <td>${timersRunTimeDisplay[2]}</td>
              </tr>
              <tr>
                <th>Запуски</th>
                <td>${timersStarts[0]}</td>
                <td>${timersStarts[1]}</td>
                <td>${timersStarts[2]}</td>
              </tr>
               <tr>
                <th>Остановки</th>
                <td>${timersStops[0]}</td>
                <td>${timersStops[1]}</td>
                <td>${timersStops[2]}</td>
              </tr>
               <tr>
                <th>Завершения</th>
                <td>${timersFinished[0]}</td>
                <td>${timersFinished[1]}</td>
                <td>${timersFinished[2]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`;
  main.appendChild(statistic);
  //close
  close_statistic.addEventListener("click", () => {
    menu.remove();
    timersRunTime[3] = 0;
  });
};

//open and change tasks
tasksAdded.addEventListener("click", (e) => {
  let deleteTask = e.target.closest(".delete_task");
  if (deleteTask) return deleteTask.closest(".task_queue").remove();

  let openTask = e.target.closest(".task_queue");
  if (openTask) {
    //close task without save
    if (e.target.closest(".cancel_task_changes")) {
      openTask.querySelector(".task_text").style.height = "1.2em";
      openTask.querySelector(
        ".task_buttons"
      ).innerHTML = `<span class="material-symbols-outlined delete_task"> close </span>`;
      openTask.querySelector(".task_text").value = taskTextInitialValue;
      return;
    }
    //close task and save changes
    if (e.target.closest(".save_task_changes")) {
      openTask.querySelector(".task_text").style.height = "1.2em";
      openTask.querySelector(
        ".task_buttons"
      ).innerHTML = `<span class="material-symbols-outlined delete_task">close</span>`;
      return;
    }

    //add buttons to save or close task
    openTask.querySelector(
      ".task_buttons"
    ).innerHTML = `<span class="material-symbols-outlined cancel_task_changes">close</span>
             <span class="material-symbols-outlined save_task_changes">
check</span>`;

    //task height
    const taskText = openTask.querySelector(".task_text");
    taskText.style.height =
      taskText.scrollHeight > 44 ? taskText.scrollHeight + "px" : "2.4em";

    taskText.addEventListener("input", function () {
      if (taskText.scrollHeight > 44) {
        taskText.style.height = taskText.scrollHeight + "px";
      }
    });

    //save intital task text
    taskTextInitialValue = openTask.querySelector(".task_text").value;
  }
});
