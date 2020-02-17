import { writable } from "svelte/store";
import GoTrue from "gotrue-js";

const goTrueInstance = new GoTrue({
  APIUrl: `https://500-cards.netlify.com/.netlify/identity`,
  setCookie: true
});

const goTrueUser = goTrueInstance.currentUser() || undefined;

export const user = writable(goTrueUser);

export function signup(email, password) {
  return goTrueInstance.signup(email, password);
}

export function confirm(token) {
  return goTrueInstance.confirm(token);
}

export async function signin(email, password) {
  return goTrueInstance.login(email, password, true).then(u => {
    user.update(() => u);
  });
}

export function signout() {
  return goTrueUser.logout().finally(() => {
    user.update(u => undefined);
  });
}

export async function updateUserSecuritySettings(email, password) {
  try {
    const updatedUser = await goTrueUser.update({
      email: email,
      password: password
    });

    return user.update(() => updatedUser);
  } catch (e) {
    alert(e.message);
  }
}

export async function updateUserCustomSettings(fullname) {
  try {
    const updatedUser = await goTrueUser.update({
      data: { fullname: fullname }
    });

    user.update(() => updatedUser);
  } catch (e) {
    alert(e.message);
  }
}

export function requestPasswordRecovery(email) {
  return goTrueInstance.requestPasswordRecovery(email);
}

export async function recover(token) {
  try {
    let existingUser = await goTrueInstance.recover(token);

    alert(
      "Account recovered! You are now logged in. Please change your password immediately by updating your security settings.",
      JSON.stringify({ response })
    );
    console.log(`recovered account: ${existingUser}`);
    user.update(() => existingUser);
    window.location.assign("/settings");
  } catch (e) {
    console.log("something wrong with recovery");
    alert(e.message);
  }
}
