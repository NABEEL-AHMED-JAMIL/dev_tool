export interface XMLInfo {
    url: string;
    tags: TagInfo[];
    screen_shoot: false;
    html_cdata: boolean;
    page_url: boolean;
    pdf: boolean;
    html: boolean;
}

export interface TagInfo {
    tag_name: string;
    parent_tag: string;
    html_tag: string;
    cdata: boolean;
}