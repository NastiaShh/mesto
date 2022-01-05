export class UserInfo {
  constructor({userNameSelector, userInfoSelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent,
      avatar: this._userAvatar.textContent
    };
  }

  setUserInfo({name, info}) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
  }

  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}