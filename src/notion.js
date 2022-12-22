"use strict";

import { Client } from "@notionhq/client";

let notion = null
export const authorizeNotion = async (token) => {
  if (!token) {
    throw new Error('Token is not provided')
  }
  
  notion = await new Client({
    auth: token,
  });
  return notion
}

export const appendContentToPage = async (text) => {
  const blockId = process.env.NOTION_PAGE_ID || ''

  if (notion === null) {
    throw new Error('Notion is not authorized')
  }
  
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

export const validateToken = async (token) => {
  const regex = /^secret_.{32}$/

  if (!regex.test(token)) {
    return false
  }

  try {
    await authorizeNotion(token)
    return true
  } catch (error) {
    return false
  }
}