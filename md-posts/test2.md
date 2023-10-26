---
title: When to Use Static Generation vs. Server-side Rendering 👨‍💻
date: '2023-03-17'
img: 'https://images.unsplash.com/photo-1682686580024-580519d4b2d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1886&q=80'
---

We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.

#### Key Words and Translations 

📜
| English           | (日本語訳) |
|-------------------|-----------------------------|
| gorilla           | ゴリラ                       |
| virus             | ウイルス                     |
| pneumonia         | 肺炎                        |
| Rwanda            | ルワンダ                     |
| Science           | サイエンス                   |
| conservationist   | 自然保護主義者                |
| extinction        | 絶滅                        |
| endangered        | 絶滅危惧種                    |
| veterinarian      | 獣医                        |
| sample            | サンプル                     |
| RSV               | 呼吸器感染ウイルス             |
| infection         | 感染                        |
| germs             | 細菌                        |
| host              | 宿主                        |
| defenses          | 防御力                      |
| Transboundary     | 越境的な                     |
| Epidemiology      | 疫学                        |
| Analytics         | 分析                        |
| outbreak          | 発生                        |
| vaccine           | ワクチン                     |
| vocabulary        | 語彙                        |
| weather           | 天気                        |
| amazing           | 素晴らしい                   |
| alive             | 生きている                   |
| rare              | 珍しい                      |
| mild              | 軽い                        |
| severe            | 重い                        |
| social            | 社会的な                     |
| infect            | 感染させる                   |
| explain           | 説明する                     |