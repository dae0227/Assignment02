document.addEventListener("DOMContentLoaded", function () {
  document.getElementsByName("reset")[0].addEventListener("click", function () {
    resetForm();
  });
  document.getElementsByName("save")[0].addEventListener("click", function () {
    saveItem();
  });
});
function saveItem() {
  if (validateItemForm()) {
    let form = document.getElementById("newitem");
    let elem = document.createElement("div");
    elem.innerHTML = form.text.trim();
    elem.firstChild.classList.add("newitem");
    document.querySelector(".todo .content").append(elem.firstChild);

    let date = new Date();

    document.querySelector(
      ".newitem .todo"
    ).textContent = document.getElementsByName("todo")[0].value;
    document.querySelector(".newitem .date").textContent =
      date.getFullYear() +
      "-" +
      (date.getUTCMonth() + 1).fillZero(2) +
      "-" +
      date.getDate().fillZero(2) +
      ", ";
    document.querySelector(".newitem .priority").textContent =
      "Priority " +
      document.querySelector('input[name="priority"]:checked').value;

    document
      .querySelector(".newitem .moveitem")
      .addEventListener("click", function (e) {
        moveItem(e.target);
      });

    document.querySelector(".newitem").classList.remove("newitem");

    resetForm();
  }
}

function resetForm() {
  document.getElementsByName("todo")[0].value = "";
  let radios = document.getElementsByName("priority");
  radios.forEach(function (radio) {
    radio.checked = false;
  });
}

function validateItemForm() {
  let todo = validateItemField("todo", "To Do:", "input");
  let priority = validateItemField("priority", "Priority:", "radio");
  if (todo == "" || priority == "") {
    return false;
  } else {
    return true;
  }
}

function validateItemField(fieldname, label, fieldtype) {
  let val = "";
  switch (fieldtype) {
    case "input":
      val = document.getElementsByName(fieldname)[0].value;
      if (val == "") {
        alert(label + " Please input data.");
        document.getElementsByName(fieldname)[0].focus();
      }
      break;
    case "radio":
      if (
        document.querySelector('input[name="' + fieldname + '"]:checked') !=
        null
      ) {
        val = document.querySelector('input[name="' + fieldname + '"]:checked')
          .value;
      }
      if (val == "") {
        alert(label + " Please make a selection");
      }
      break;
  }
  return val;
}

Number.prototype.fillZero = function (width) {
  let n = String(this);
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
};

function moveItem(elem) {
  let section = elem.parentNode.parentNode.parentNode;
  let item = elem.parentNode;

  if (section.classList.contains("doing")) {
    elem.remove();
  }

  let ditem = item.parentNode.removeChild(item);
  document
    .querySelector("." + section.nextElementSibling.className + " .content")
    .append(ditem);
}
