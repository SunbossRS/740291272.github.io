---
layout: page
title: Links
description: Everyone needs friends..
keywords: links
comments: true
menu: Links
permalink: /links/
---

>Friend's Website .

{% for link in site.data.links %}
* [{{ link.name }}]({{ link.url }})
{% endfor %}
