(function(env) {
    "use strict";
    
    env.ddg_spice_indeed_jobs = function(api_result) {
        if (api_result.error || !api_result.results.length) {
            return Spice.failed('indeed_jobs');
        }

        var q = api_result.query || '',
            loc = api_result.location || '',
            re = /^http:\/\/([a-z.]+)\//,
            rematch = api_result.results[0].url.match(re),
            www_domain = rematch ? rematch[0] : "http://www.indeed.com/";
        
        Spice.add({
            id: "indeed_jobs",
            name: "Indeed Jobs",
            data: api_result.results,
            meta: {
                sourceName: "Indeed",
                sourceUrl: www_domain + 'jobs?q=' + encodeURIComponent(q) + '&l=' + encodeURIComponent(loc)
            },
            normalize: function(item) {
                return {
                    url: item.url,
                    title: item.jobtitle,
                    subtitle: item.company,
                    description: DDG.strip_html(item.snippet)
                };
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                options: {
                    footer: Spice.indeed_jobs.footer
                },
                variants: {
                    tileTitle: '2line',
                    tileSnippet: 'large',
                    tileFooter: '2line'
                }
            }
        });
    };
}(this));
