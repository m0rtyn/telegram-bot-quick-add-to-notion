"use strict";

import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const appendContentToPage = async (text) => {
  const blockId = process.env.NOTION_PAGE_ID || ''

  try {
    const response = await notion.blocks.children.append({
      block_id: blockId,
      children: [
        {
          "paragraph": {
            "rich_text": [
              {
                "text": {
                  "content": text,
                }
              }
            ]
          }
        }
      ],
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}