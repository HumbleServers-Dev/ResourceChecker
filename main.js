import fetch from 'node-fetch';
import * as fs from 'fs';
import config from './config.json' assert {type: "json"};
import version from './version.json' assert {type: "json"};

let response = await fetch('https://api.spiget.org/v2/resources/98400/versions/latest');
let rawdata = await response.json();
let newver = rawdata.id;
let oldver = version.ver;



console.log("Ready!")
console.log("Watching Plugins now!")


setInterval(async function () {
    if(newver>oldver){
        send(config.webhook);
        fs.writeFile("./version.json", JSON.stringify({ver: newver}), (err) => {
            if (err) throw err;
        });
        oldver =newver;
    }
}, 10000)



function send(link){
    fetch(
        link,
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: '_w41k3r',
                avatar_url: config.avatar,

                allowed_mentions: {
                    parse: ['users', 'roles'],
                },


                embeds: [
                    {
                        color: 15700003,
                        title: 'Plugin Update!',
                        description: 'A new plugin update has been posted!!',
                        thumbnail: {
                            url: config.thumb,
                        },
                        fields: [
                            {
                                name: 'Plugin',
                                value: 'Shopkeepers Addon',
                                inline: 'true'
                            },
                            {
                                name: 'Version',
                                value: rawdata.name,
                                inline: 'true'
                            },
                        ],


                        footer: {
                            text: 'SpigotMC',
                            icon_url: 'https://cdn.discordapp.com/icons/690411863766466590/a_c03c1f2a5f9768f1b6520dbbc93a6920.png?size=4096',
                        },


                        // author: {
                        //     name: 'SpigotMC',
                        //     icon_url: 'https://cdn.discordapp.com/icons/690411863766466590/a_c03c1f2a5f9768f1b6520dbbc93a6920.png?size=4096',
                        // },
                        //content: '',

                        // url: 'https://gist.github.com/dragonwocky/ea61c8d21db17913a43da92efe0de634',
                        // image
                        // - picture below description(and fields)
                        // image: {
                        //     url:
                        //         'http://tolkiengateway.net/w/images/thumb/7/75/J.R.R._Tolkien_-_Ring_verse.jpg/300px-J.R.R._Tolkien_-_Ring_verse.jpg',
                        // },
                        // footer
                        // - icon next to text at bottom

                    },
                ],
                components: [
                    {
                        "type": 1,
                        "components": [
                            {
                                "type": 2,
                                "style": 5,
                                "label": "Download",
                                "url": "https://www.spigotmc.org/resources/shopkeepers-addon-navigation-economy-plotsquared-vault-integration.98400/"
                            },
                            {
                                "type": 2,
                                "style": 5,
                                "label": "Changelog",
                                "url": "https://www.spigotmc.org/resources/shopkeepers-addon-navigation-economy-plotsquared-vault-integration.98400/updates"
                            },
                            {
                                "type": 2,
                                "style": 5,
                                "label": "Get a Server",
                                "url": "https://billing.humbleservers.com/link.php?id=16"
                            }
                        ]
                    }

                ]
            }),
        }
    );


    console.log('New Update found.', rawdata.name, 'Notification Sent!')
}