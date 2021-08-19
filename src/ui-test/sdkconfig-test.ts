import { expect } from "chai";
import { Workbench, EditorView, WebView, By } from "vscode-extension-tester";

describe("SDKConfig Editor", () => {
  let view: WebView;

  before(async function () {
    this.timeout(100000);
    await new Workbench().executeCommand("espIdf.menuconfig.start");
    await new Promise((res) => setTimeout(res, 50000));
  });

  after(async () => {
    if (view) {
      await view.switchBack();
    }
    await new EditorView().closeAllEditors();
  });

  it("findWebElement works", async () => {
    view = new WebView();
    await view.switchToFrame();
    const element = await view.findWebElement(By.id("searchbar-save"));
    expect(await element.getText()).has.string("Save");
  }).timeout(999999);
});
