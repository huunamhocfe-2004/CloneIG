const messChat = document.getElementById("mess-box");
const showMessChat = document.getElementById("mess-fixed_btn");
const closeMessBox = document.getElementById("close-mess_box");
const searchMessBox = document.getElementById("search_mess-box");
const textLogo = document.getElementById("text-logo");
const imageLogo = document.getElementById("image-logo");
let isFromNavAction = false;

const params = new URLSearchParams(window.location.search);
const action = params.get("action");
if (action === "change-nav") {
  isFromNavAction = true;
  document.documentElement.style.setProperty("--nav-width", "7rem");
  if (imageLogo) {
    imageLogo.style.opacity = "1";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const textArea = document.getElementById("textAreaEnterChat");
  const sendBtn = document.getElementById("send-btn-txt");
  const inboxField = document.getElementById("inbox_field");
  const imgUploadBtn = document.getElementById("image-upload-btn");
  const imgInput = document.getElementById("imgInput");
  const imagePreview = document.getElementById("image-preview");
  const listEnterMess = document.getElementById("enter_mess-opts");
  const imgInputPost = document.getElementById("imgInputPost");
  const btnUpLoadPosts = document.querySelectorAll(".upLoadPost");
  const postWrapper = document.getElementById("post_wrapper");

  let selectedImageData = null;

  function updateSendBtnVisibility() {
    const messValue = textArea.value.trim();
    if (messValue !== "" || selectedImageData) {
      sendBtn.style.visibility = "visible";
      sendBtn.style.opacity = "1";
    } else {
      sendBtn.style.visibility = "hidden";
      sendBtn.style.opacity = "0";
    }
  }

  if (textArea && sendBtn && inboxField) {
    textArea.addEventListener("input", () => {
      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";
      updateSendBtnVisibility();
    });
  }

  if (imgUploadBtn) {
    imgUploadBtn.addEventListener("click", () => {
      if (imgInput) {
        imgInput.click();
      }
    });
  }

  if (imgInput) {
    imgInput.addEventListener("change", () => {
      const file = imgInput.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          selectedImageData = e.target.result;

          imagePreview.style.display = "block";

          imagePreview.innerHTML = `<img src="${selectedImageData}" alt ="image" />`;
          listEnterMess.style.display = "none";

          updateSendBtnVisibility();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const messValue = textArea.value.trim();

      if (messValue !== "" || selectedImageData) {
        const newMessage = document.createElement("div");
        newMessage.className = "mess_of_me mess_of-frame";

        let content = "";

        if (selectedImageData) {
          content += `<div class="mess-txt_frame-hasImg">
                    <div class="mess-img_frame">
                      <img src="${selectedImageData}" alt="" />
                    </div>
                  </div>`;
        }

        if (messValue !== "") {
          content += `<p class="mess-txt_frame">${messValue}</p>`;
        }

        newMessage.innerHTML = content;
        inboxField.appendChild(newMessage);
        inboxField.scrollTop = inboxField.scrollHeight;

        // Reset
        textArea.value = "";
        textArea.style.height = "auto";
        selectedImageData = null;
        imgInput.value = "";
        imagePreview.innerHTML = ``;
        imagePreview.style.display = "none";
        listEnterMess.style.display = "flex";

        sendBtn.style.visibility = "hidden";
        sendBtn.style.opacity = "0";
      }
    });
  }

  btnUpLoadPosts.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", () => {
        if (imgInputPost) {
          imgInputPost.click();
        }
      });
    }
  });
  if (imgInputPost) {
    imgInputPost.addEventListener("change", () => {
      const file = imgInputPost.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          selectedImageData = e.target.result;
          const newItem = document.createElement("div");
          newItem.className = "explore-item";
          newItem.innerHTML = `<img src="${selectedImageData}" alt="" />
              <div class="explore-item_imgs">
                <ion-icon name="copy"></ion-icon>
              </div>
              <div class="explore-item_overlay">
                <div class="exio-react">
                  <div class="nums_react">
                    <i class="fa-solid fa-heart"></i>
                    <span>310K</span>
                  </div>
                  <div class="nums_react">
                    <i class="fa-solid fa-comment"></i>
                    <span>102</span>
                  </div>
                </div>
              </div>`;

          const secondChildElement = postWrapper.children[1];
          setTimeout(() => {
            if (secondChildElement) {
              postWrapper.insertBefore(newItem, secondChildElement);
            } else {
              postWrapper.appendChild(newItem);
            }
          }, 500);
        };
        reader.readAsDataURL(file);
      }
    });
  }
});

if (showMessChat) {
  showMessChat.addEventListener("click", () => {
    messChat.classList.add("showMessBox");
    searchMessBox.style.bottom = "2rem";
  });
  closeMessBox.addEventListener("click", () => {
    messChat.classList.remove("showMessBox");
  });
}

const btnArrSwaps = document.querySelectorAll(".btn-arr-swap");
btnArrSwaps.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation;
    btn.classList.toggle("clicked");
    btn.textContent = btn.classList.contains("clicked")
      ? "Following"
      : "Follow";
    btn.style.color = btn.classList.contains("clicked") ? "#333" : "blue";
  });
});

const cancelSettingPost = document.getElementById("cancel_setting-post");
const showSettingPosts = document.querySelectorAll(".show_setting-post");
const settingPost = document.getElementById("setting_post");
const showSpDetails = document.querySelectorAll(".show_sp-detail");
const getListStPost = document.getElementById("list-st_post");

showSettingPosts.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation;
    settingPost.classList.add("showSettingPost");
    document.body.style.overflow = "hidden";
  });
});

showSpDetails.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation;
    const newItem1 = document.createElement("li");
    const newItem2 = document.createElement("li");
    newItem1.style.color = "red";
    const index = 1;
    const referenceItem1 = getListStPost.children[index];
    const referenceItem2 = getListStPost.children[index];
    settingPost.style.zIndex = "1111111";
    settingPost.classList.add("showSettingPost");
    newItem1.textContent = `Unfollow`;
    newItem2.textContent = `Add to favourites`;
    getListStPost.insertBefore(newItem1, referenceItem1);
    getListStPost.insertBefore(newItem2, referenceItem2);
  });
});

cancelSettingPost.addEventListener("click", () => {
  settingPost.classList.remove("showSettingPost");
});

settingPost.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target === e.currentTarget) {
    settingPost.classList.remove("showSettingPost");
    document.body.style.overflow = "";
  }
});

const cancelFollowOption = document.getElementById("cancel_fl-otp");
const showFollowOption = document.querySelectorAll(".noti-btn-follow");
const followOption = document.getElementById("follow-option");

showFollowOption.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation;
    followOption.classList.add("showSettingPost");
    document.body.style.overflow = "hidden";
  });
});
if (cancelFollowOption) {
  cancelFollowOption.addEventListener("click", () => {
    followOption.classList.remove("showSettingPost");
  });
}
if (followOption) {
  followOption.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      followOption.classList.remove("showSettingPost");
      document.body.style.overflow = "";
    }
  });
}

const iconLikes = document.querySelectorAll(".post_at-loving .fa-heart");
iconLikes.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("fa-solid");
    btn.classList.toggle("liked");
    btn.classList.toggle("fa-regular");
  });
});

const iconSaveds = document.querySelectorAll(".post_at-saving .fa-bookmark");
iconSaveds.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("fa-solid");
    btn.classList.toggle("fa-regular");
    btn.classList.toggle("saved");
  });
});

const getDetailPost = document.querySelectorAll(
  ".post_active .fa-comment, .see_comments, .explore-item"
);
const postDetail = document.getElementById("post_detail");
getDetailPost.forEach((btn) => {
  btn.addEventListener("click", () => {
    postDetail.classList.add("showPostDetail");
    document.body.style.overflow = "hidden";
  });
});

postDetail.addEventListener("click", (e) => {
  e.stopPropagation;
  if (e.target === e.currentTarget) {
    postDetail.classList.remove("showPostDetail");
    document.body.style.overflow = "";
  }
});

const inputSearch = document.getElementById("input_search");
const deleteTxtSearch = document.getElementById("delete_all-txt");

inputSearch.addEventListener("input", (e) => {
  const value = e.target.value;
  if (value !== "") {
    deleteTxtSearch.style.visibility = "visible";
    deleteTxtSearch.style.transition = ".3s linear";
    deleteTxtSearch.style.opacity = "1";
  } else {
    deleteTxtSearch.style.visibility = "hidden";
    deleteTxtSearch.style.transition = ".3s linear";
    deleteTxtSearch.style.opacity = "0";
  }
});

deleteTxtSearch.addEventListener("click", () => {
  inputSearch.value = "";
  inputSearch.focus();
  inputSearch.dispatchEvent(new Event("input"));
});

const searchFrame = document.getElementById("search_overlay");
const showSearchFrame = document.getElementById("item-link-search");

showSearchFrame.addEventListener("click", (e) => {
  e.preventDefault();
  document.documentElement.style.setProperty("--nav-width", "7rem");
  if (textLogo) {
    textLogo.style.opacity = "0";
  }
  if (imageLogo) {
    imageLogo.style.opacity = "1";
  }
  searchFrame.classList.toggle("search_overlay-show");
  if (searchFrame.classList.contains("search_overlay-show")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
searchFrame.addEventListener("click", (e) => {
  // e.stopPropagation;
  if (e.target === e.currentTarget) {
    if (!isFromNavAction) {
      document.documentElement.style.setProperty("--nav-width", "25rem");
      textLogo.style.opacity = "1";
      imageLogo.style.opacity = "0";
    }
    searchFrame.classList.remove("search_overlay-show");
    document.body.style.overflow = "";
  }
});

const deleteSearchUsers = document.querySelectorAll(".btn-dlt");
deleteSearchUsers.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.remove();
  });
});

const links = document.querySelectorAll("a");
links.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const bar = document.getElementById("progress-bar");
    bar.style.width = "0%";
    e.preventDefault();

    bar.style.transition = "width 0.5s ease";
    bar.style.width = "100%";

    setTimeout(() => {
      window.location.href = btn.href;
    }, 500);
  });
});

const notifiFrame = document.getElementById("notification_overlay");
const showNotifiFrames = document.querySelectorAll(".item-link-notifi");

showNotifiFrames.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.documentElement.style.setProperty("--nav-width", "7rem");
    if (textLogo) {
      textLogo.style.opacity = "0";
    }
    if (imageLogo) {
      imageLogo.style.opacity = "1";
    }
    notifiFrame.classList.toggle("search_overlay-show");
    if (notifiFrame.classList.contains("search_overlay-show")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });
});

notifiFrame.addEventListener("click", (e) => {
  e.stopPropagation;
  if (e.target === e.currentTarget) {
    if (!isFromNavAction) {
      document.documentElement.style.setProperty("--nav-width", "25rem");
      if (textLogo) {
        textLogo.style.opacity = "1";
      }
      if (imageLogo) {
        imageLogo.style.opacity = "0";
      }
    }

    notifiFrame.classList.remove("search_overlay-show");
    document.body.style.overflow = "";
  }
});

const showInboxDetails = document.getElementById("show-ibDetails");
const inboxDetaisWrapper = document.getElementById("inbox-details_wrapper");
let toggle = true;
if (showInboxDetails) {
  showInboxDetails.addEventListener("click", () => {
    if (toggle) {
      document
        .querySelector('ion-icon[name="information-circle-outline"]')
        .setAttribute("name", "information-circle");
      inboxDetaisWrapper.style.width = "70rem";
    } else {
      document
        .querySelector('ion-icon[name="information-circle"]')
        .setAttribute("name", "information-circle-outline");
      inboxDetaisWrapper.style.width = "0rem";
    }
    toggle = !toggle;
  });
}
