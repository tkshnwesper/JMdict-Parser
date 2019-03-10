# What is this?

It's just a small script that does its job! Let me explain...

## Installation

```
npm i -g jmdict-parser
```

#### JMdict

JMdict is a Japanese to X (X being English, and a couple of other languages) dictionary whose files are in XML format.

#### So what?

Well, in order to make something useful out of it, we need to get the data in the XML files into your computer's memory in an orderly fashion.

#### What can I do with that?

If you'd like to keep the data in your memory and access it from there or create a database out of it is entirely upto you, and this script does not interfere with what you have in mind.

#### Got it, but where does JSON come in the picture?

That's the thing here. The library that I'm using for parsing the XML data converts it into a Javascript object, and then I write that object to a JSON file.

#### What do I do with the JSON?

The JSON file can be read easily for future use, and it is even ~25% smaller than the original XML file!

# Structure of JSON

The JSON file is essentially an array of `entry` objects. Here's what one random `entry` object looks like:

```json
{
   "ent_seq":[
      "1002340"
   ],
   "k_ele":[
      {
         "keb":[
            "お早うございます"
         ],
         "ke_pri":[
            "spec1"
         ]
      }
   ],
   "r_ele":[
      {
         "reb":[
            "おはようございます"
         ],
         "re_pri":[
            "spec1"
         ]
      }
   ],
   "sense":[
      {
         "pos":[
            "&int;"
         ],
         "xref":[
            "お早おおう"
         ],
         "misc":[
            "&uk;",
            "&pol;"
         ],
         "s_inf":[
            "may be used more generally at any time of day"
         ],
         "gloss":[
            "good morning"
         ]
      }
   ]
}
```

For more information about the key names read the comments at the start of the original JMdict files.

# How to use

Head over to the [JMdict](http://www.edrdg.org/jmdict/edict_doc.html) website and download the version of the dictionary file suitable for you. Don't forget to **extract** it.

Next, clone this repository, `cd` into it and open `index.js`. Change the
```js
const JMDICT_PATH = './JMdict_e';
```
to wherever the **extracted** JMdict file is located.

Now simply run
```sh
node index.js
```

It will create a new file called `JMdict.json` in the same directory.

# Download

I have already created one for the English **only** JMdict file. You can grab it from [here](https://droppy.cryf.in/$/qfxsg).