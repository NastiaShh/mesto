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

  getUserId() {
    return this._userId;
  }

  setUserInfo({name, info, userId}) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
    this._userId = userId;
  }

  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}