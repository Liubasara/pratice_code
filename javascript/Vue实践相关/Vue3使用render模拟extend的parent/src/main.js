import { createApp, h, render } from "vue";
import Lightbox from "./components/Lightbox.vue";
import App from "./App.vue";

const app = createApp(App);

app.directive("lightbox", {
  // mounted(el, binding) {
  mounted(el) {
    el.addEventListener("click", (event) => {
      if (!event.target.matches("img")) {
        return;
      }
      event.preventDefault();
      const lightboxEl = document.createElement("div");
      document.body.appendChild(lightboxEl);
      console.log(lightboxEl);
      const lightbox = app.render(
        Lightbox,
        {
          src: event.target.src,
          onClose() {
            app.unrender(lightbox);
            lightboxEl.parentNode.removeChild(lightboxEl);
          },
        },
        lightboxEl
      );
    });
  },
});

app.render = function(Component, props, el) {
  if (typeof el === "string") {
    el = document.querySelector(el);
  }

  if (!el) {
    throw new Error("el not found");
  }

  if (props && {}.toString.call(props) !== "[object Object]") {
    throw Error("props must be an object");
  }

  const childTree = h(Component, props);
  childTree.appContext = app._context;

  // Creating a wrapper element here is clunky and ideally wouldn't be necessary
  const div = document.createElement("div");
  el.appendChild(div);

  render(childTree, div);

  return childTree.component.proxy;
};

app.unrender = function(vm) {
  const el = vm.$el.parentNode;

  render(null, el);

  el.parentNode.removeChild(el);
  console.log(document.body);
};

app.mount("#app");
