import { HeiszorgaWebNewPage } from './app.po';

describe('heiszorga-web-new App', function() {
  let page: HeiszorgaWebNewPage;

  beforeEach(() => {
    page = new HeiszorgaWebNewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
