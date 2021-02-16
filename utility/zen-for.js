const renderEvent = new Event("render-complete");
const initializedEvent = new Event("init-complete");
const removedEvent = new Event("remove-complete");
const attributeChangedEvent = new Event("attribute-change-complete");

class zenUtilityFor extends HTMLElement {
  constructor() {
    super();
    if (!window.zen) {
      window.zen = {};
    }
    this.originalHTML = "";
    this.renderContent = () => {
      return new Promise((resolve, reject) => {
        try {
          this.innerHTML = this.render(this.originalHTML);
          this.dispatchEvent(renderEvent);
          resolve("Render Complete");
        } catch (e) {
          reject(e);
        }
      });
    };
  }

  get list() {
    return this.getAttribute("list");
  }

  set list(val) {
    return this.setAttribute("list", val);
  }

  escapeHTML = (html) => {
    const escapeUtility = document.createElement("textarea");
    escapeUtility.textContent = html;
    return escapeUtility.innerHTML;
  };

  render(htmlContent) {
    let regex = /(\$\{[a-z\s\|]+\})/gi;
    let keyTokens = htmlContent.match(regex);
    let htmlString = "";
    if (!zen[this.list]) {
      throw `'${this.list}' is not available as a property of global Zen object`;
    }
    zen[this.list].forEach((obj) => {
      let parsedHtml = htmlContent;
      keyTokens &&
        keyTokens.forEach((token) => {
          let formatters = token.match(/(\s\|\s[a-z]+)/gi);
          let key;
          if (formatters) {
            key = token.replaceAll(formatters.join(""), "");
          } else {
            key = token;
          }
          key = key.replaceAll("{", "").replaceAll("}", "");
          let value = obj[`${key.split("$")[1]}`];
          if (!value) {
            console.warn(
              `'${key.split("$")[1]}' property is not available on the Object`,
              obj
            );
          } else if (formatters) {
            for (let individualFormatter of formatters) {
              const strippedFormatter = individualFormatter.split(" | ")[1];
              switch (strippedFormatter) {
                case "datetime":
                  value = new Date(value).toLocaleString(undefined, {
                    month: "long",
                    year: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  });
                  break;
                case "date":
                  value = new Date(value).toLocaleString(undefined, {
                    month: "long",
                    year: "numeric",
                    day: "numeric",
                  });
                  break;
                case "time":
                  value = new Date(value).toLocaleString(undefined, {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  });
                  break;
                case "escape":
                  value = this.escapeHTML(value);
                  break;
                case "upper":
                  value = value.toUpperCase();
                  break;
                case "lower":
                  value = value.toLowerCase();
                  break;
                default:
                  break;
              }
            }
          }
          parsedHtml = parsedHtml.replaceAll(token, value);
        });
      htmlString += `${parsedHtml}`;
    });
    return htmlString;
  }

  static get observedAttributes() {
    return ["list"];
  }

  attributeChangedCallback(prop, oldval, newval) {
    if (prop === "list" && newval) {
      this.dispatchEvent(attributeChangedEvent);
      this.innerHTML = this.render(this.originalHTML);
      this.dispatchEvent(renderEvent);
    }
  }

  connectedCallback() {
    this.originalHTML = this.innerHTML;
    if (this.list) {
      this.innerHTML = this.render(this.originalHTML);
      this.dispatchEvent(renderEvent);
    }
    this.dispatchEvent(initializedEvent);
  }

  disconnectedCallback() {
    this.dispatchEvent(removedEvent);
  }
}

customElements.define("zen-for", zenUtilityFor);
