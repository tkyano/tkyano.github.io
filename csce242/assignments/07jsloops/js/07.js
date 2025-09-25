const sceneBtn = document.getElementById("btn-draw-scene");
const mainBox = document.getElementById("main-box");

const sceneContainer = document.createElement("div");
sceneContainer.id = "scene";
mainBox.appendChild(sceneContainer);

const createElement = (type, className = null, id = null) => {
    const element = document.createElement("div");
    if (className) {
        element.className = className;
    }
    if (id) {
        element.id = id;
    }
    return element;
};

const drawScene = () => {
    sceneContainer.innerHTML = "";

    const now = new Date();
    const hour = now.getHours();
    const isNight = hour < 6 || hour >= 18;

    document.body.style.backgroundColor = isNight ? "rgb(74, 83, 122)" : "rgb(182, 238, 255)";

    const skyItem = createElement("div", null, isNight ? "moon" : "sun");
    sceneContainer.appendChild(skyItem);

    const cloudRow = createElement("div", null, "cloud-row");
    const treeRow = createElement("div", null, "tree-row");

    for (let i = 0; i < 6; i++) {
        const cloud = createElement("div", "cloud");
        cloudRow.appendChild(cloud);

        const tree = createElement("div", "tree");
        treeRow.appendChild(tree);
    }

    sceneContainer.appendChild(cloudRow);
    sceneContainer.appendChild(treeRow);
};

sceneBtn.addEventListener("click", drawScene);
