# Voice samples

Excerpts from texts Jonas wrote himself, copied as they are in the repo, typos included. Listen to the rhythm, the connectors and the level of detail. Do not copy the typos or the grammar slips.

## Small things: fragments, facts, one cheerful line

`art/svgSDF.ts`

> Little proof of concept to render SVGs with SDFs to get smooth and continuous distance fields for arbitrary shapes.

`software/state-to-function.ts`

> POC to allow users to store simple math in a url. Uses url-safe-bitpacking. No backend used at all! All state is Frontend only. PDF exports also contain a QR codes that stores the url.

`art/aMerryFXMesh.ts`

> New Year and Christmas Wishes 2024. Entire state stored in the url!
>
> You can edit the pattern and text. Everything gets stored in the url!

`software/repurposed.ts`

> Repurposed is a POC for a general purpose marketplace for reuse construction elements.
>
> From Idea to Prototype in 24 hours. Leveraging AI to populate data from images, cad interface for visualising (partial) inputs.
>
> This project is a static frontend page, using next.js, convex backend.

`software/densing.ts`

> Library for numeric level (de)compacting of objects based on a schema. Iteration on my experience with url-safe-bitpacking, aiming for a nicer developer experience, more performance and more scalable data types.

`software/paraSlimShady.ts`

> A derivative of a prototype based on the 'Julierturm' that I made for a friend back in 2023

Notice: no subject where it is not needed, the stack is listed and not praised, an honest label (POC, iteration, derivative of a prototype).

## Software with a story: problem, decision, trade-off, what is still open

`software/urlSafeBitpacker.ts`

> For many of my projects I have faced the problem of having a relatively simple, yet variable in definition parametric model. In the cloud based web, one would store those data models in a database. However this is quite a bit of additional overhead for simple configurators. In true web-3 (and GDPR compliancy) I aimed at storing the whole parametric model in a single string that could be stored in the url.
>
> The goal of this library is to offer a flexible, minimal and, variable object definition that can be stored in the browser URL. It relies heavily relies on the bitpacking of custom bitwidth numeric values. Because of that, the biggest trade-off for this library is legibility. Without the related object definition, it would be impossible to reconstruct the state. The big advantage though is the ability to store rather many variables in a very condensed URL, allowing to store all information in rather short urls which then can be used for qr code generation.
>
> One of the majoral hurdles, that hasn\t been fully dealt with yet, is the wish to be able to walk through as many states of the parametric model with as few possible sliders. Basically interpreting the whole of the parametric model as a single multidmensional spline
>
> A POC with a visualisation has been implemented, but it isn\t yet able to deal with discontinuties in the parametric model.

`software/lucernaeTurici.ts`

> This project is the culmination of a whole bunch of preceding projects. A trajectory that started of with hand cut models had an intermediate stop at 2D CAD lasercut and 3D stl print files to reaching a first POC milestone in the beginning of 2024. A configurator for my life-long companion: Architectural Lamps.
>
> As the process started to come along I decided to also try to see how far I could push the deformation of the geometries. Right now one can twist and scale the geoemtries along its z-axis
>
> To be sure the geometries are geometrically sound, I heavily constrain the topology of the geometries. All the cells in the end ar extruded prismas which are hollowed out. This makes it so that it is virtually impossible to have geometric inconsistenties

`software/digitaleAugen.ts`

> Through the years computer algorithms have become better and better at understanding image data. Though most of the algorithms until now have been used to solve very specific problems like object detection or helping with cleaning up images. All of these algorithms form their own interpretation of reality though, not that unsimilar to how our eyes and brain forms theirs.

Notice: "However", "Though", "Because of that", "The big advantage though", "Right now one can". The trade-off and the unfinished part are stated as plainly as the result.

## Fabrication and computational design: one dense paragraph, numbers, one decision explained

`computationDesign/smartBrick.ts`

> This short but intensive conceptual design project was trying to show the potential of highly compact, highly detailed, highly porous and highly versatile designs attainable when using binder-jet additive manufacturing processes. The goal was simple: try and make as large and intricate of a surface with as little material as possible. To be able to do this we opted to produce a set of tiles which fitted together like a puzzle. But rather than producing them one by one, we compacted them all into one very dense object. To be able to pack them closely, the bottom-side of the next tile in the pile always had the negative shape of the topside of the previous tile. We then printed this complex stack of tiles, which resulted in a brick shape measuring 220 x 220 x 250 mm, which was compiled of 25 individual tiles.

`computationDesign/impactClay.ts`

> From a conceptual perspective we decided very quickly to try and develop a workflow that allowed for the production of 2D surface elements. But rather than playing with informed geometries, we opted to delve deeper in one specific aspect of clay namely it’s malleability. Even though this process knows many parameters, we opted to only variate one. Namely the distance between a new bullet to be placed and the once preceding them.

`design/rrreefs.ts`

> Corals around the world are facing tough times. One hand they are suffering from their own beauty, having become a tourist attraction suffering the many drivers who want to take home a piece. Though the more existential problem is climate change.
>
> The in the end selected clay - G-ton - shrinks rather violently and upto 15% during the drying stage. Because of the many mircracks in its surface very well suited for pollipse, many of the first bricks printed had issues with drying homogeneously. To this end different infill strategies were iterated to allow for an as equal as possible drying process, reducing the internal stresses in the structure while drying.

`computationDesign/roboticGlass.ts`

> However, commercial production methods of glass do not allow for color grading glass. Yet one artisanal production method - namely the fusing of glass - has the potential to be pushed past its traditional scope.
>
> Also the effect of using different heat-curves on the final result and experimental yet risky mixing of different types of glass was attempted and led to some initial success.

Notice: "we opted to", "But rather than", "To this end", "Namely". The goal in one short sentence, then how it was done, with the measurements.

## Architecture and urbanism: context first, an opinion, a question, dry humour

`urbanism/napolitSotterana.ts`

> Modern-day Napoli is a rather illegible maze of canyonesque streets. With this comes a huge lack of qualitative and accessible public spaces. However, when you take a closer look at the form mass plan of Napoli you can really distinguish some very large patios within the blocks.
>
> Is it at all possible to make these spaces part of the public domain? What happens when you start opening existing doors? Or can you create a secondary circulation scheme by just making a few holes in some walls? To visualize this I drew two maps.
>
> What seems to be impenetrable housing blocks actually manifest a sponge-like porosity. However, this map in itself doesn’t tell the whole story.

`architecture/frituurFuturist.ts`

> This competition invited designers from all over Belgium to develop a new - iconic - model for the languishing fritkot typology. We approached it as such.
>
> Besides what is on offering, nothing about the Frituur is iconic. The most important thing they all have in common is the high degree of bricolage they seem to feature.
>
> We concluded that the only way the frituur could somehow remain the same was to ally itself to another function. The resulting gestalt typology would enable it to remain a relevant and justified feature of the ever more gentrified Belgian cityscapes, without having to compromise its original function namely: selling French fries.

`architecture/livingOnTheEdge.ts`

> In it’s infancy this thesis had a program, but not a site.
>
> For a long time it seemed as if vagueness was a goal rather than a problem. Even after a semester long periode of trial and error, the project was still stuck at an analytical stage.
>
> An impasse was reached, a decision had to be made. Instead of continuing to flog a dead horse a new direction was chosen.
>
> Using these a housing project on a graveyard became conceivable and, dare I say, even qualitative.

`architecture/jokerweek.ts`

> The practical organization is in the hands of the last year students. All the Department’s students can participate. This time it was our turn to roll up our sleeves and get our hands dirty...
>
> As you might have noticed in none of the pictures so far there’s any furniture. We intentionally got rid of it all, instead we offered the students a comfy, but sturdy, pillow. If the students believed they needed a chair? They should make one themselves!
>
> Together with the rather complex roof structure and the plasticity of the robes we ended up using grasshopper to model the lengths of the different robes necessary to keep every individual box up. In total there were 23 boxes.

Notice: the project is allowed to have been stuck. Opinions are stated without softening. The last sentence is a fact.

## Lamps: about the building and why it matters to him

`lamps/boekentoren.ts`

> The Boekentoren has a very pronounced impact on the Ghentian skyline. Having lived nearly my whole live in Ghent, this masterpiece of the modern movement has had a profound impact on my appreciation for modern architecture. Even more so when I decided to study architecture at the University of Ghent and ended up spending most of my accademical career literally studying and working in the shadow of the Boekentoren.

`lamps/anitkabir.ts`

> Every country has it's architectural masterpieces but few realisations from the 20th century are as symbolic as the Anıtkabir. The final resting ground of one of the greatest modernisers of the Interbellum period: Mustafa Kemal Ataturk. It's as fascinating as it is ironic that this building is of near religious importance to the modern Turkish identity.

`lamps/quadrato.ts`

> This beautiful though controversial building is one of the many architectural marvels built in Mussolinis Italy. The centerpiece of what was supposed to be the 1942 Esposizione Universale Roma - the modern-day 12th quarter of Rome - ended up being vacant for decades.

## About page

`components/me/About.tsx`

> Trying to apply my flair for aesthetics and curiosity for technical devolepments into the realm of Ecological and Sustainable Design.
>
> To understand the now, one has to look back. Many of my projects therefore also have a cultural heritage or ecological component.

## Subtitles (`metaData.description`)

> Lamp Topologies with SDFs
> Urban Fabric of Napoli
> Front-end Static Calculator
> POC and WIP lamp configurator
> Tool to Store Simple Math into URL state
> Using text as data to feed SDF
> Competion Entry for Contemporary Frying House Brussels
> First experiments for an online chocolate bar configurator
> POC project for quantifying the perception of window storefronts
> roboticly deposited clay artefacts
