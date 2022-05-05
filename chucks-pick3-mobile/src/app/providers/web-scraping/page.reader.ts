import * as $ from 'jquery';

export class PageReader {
  private jQuery = $;

  public constructor() {}

  /* istanbul ignore next */
  public read(html): any {
    html = html.replace(/<img[^>]*>/g, '');
    return this.jQuery(html);
  }

  public read2(html): any {
    //const jq = this.jQuery;
    html = html.replace(/<img[^>]*>/g, '');
    //const r = this.jQuery(html).find('#LastDraw');
    /*this.jQuery(html).each((a, b) => {
      if (b.localName === "table") {
        r = jq(b);
        // console.log("a: " + a + ", b: " + b)
      }
    });*/
    /*this.jQuery(html).each(data.items, function(item){
      $("<li/>").value().appendTo("#data");
    });*/
    return this.jQuery(html).find('#LastDraw');
  }

  /* istanbul ignore next */
  public get(): any {
    return this.jQuery;
  }
}
