import { NextApiRequest, NextApiResponse } from 'next'
import { PassThrough } from 'stream';

type HackerNewsStoryRaw = {
    id: number
    by: string // Author of the story
    score: number
    time: number
    title: string
    url: string
    descendants: number // Number of comments
    type: "story" // Ensures the type is strictly 'story'
  }
  
type HackerNewsStory = {
    author: string
    score: number
    title: string
    url: string
    numOfComments: number
    commentUrl: string
    postedDate: string
  }

const HN_BASE_URL = "https://hacker-news.firebaseio.com/v0"

async function fetchTopStoryIds(): Promise<number[]> {
    const response = await fetch(`${HN_BASE_URL}/topstories.json`)
    const storyIds: number[] = await response.json()
    return storyIds
  }
  
  // Fetch story details by ID
  async function fetchStoryDetails(id: number): Promise<HackerNewsStoryRaw | null> {
    const response = await fetch(`${HN_BASE_URL}/item/${id}.json`)
    const story = await response.json()
    // Check if the story has a URL and is of type 'story'
    if (story && story.url && story.type === "story") {
      return story
    }
    return null
  }

export default async function simplelinear(req: NextApiRequest, res: NextApiResponse) {
    const fetchCount = req.query.q || '1';
    const fetchCountNr = parseInt(Array.isArray(fetchCount) ? fetchCount[0] : fetchCount);
    
    const arrSize = req.query.sz || '1';
    const arrSizeNr = parseInt(Array.isArray(arrSize) ? arrSize[0] : arrSize);

    
    const start = new Date().getTime();
    console.log(`Starting at ${start}`);

    const response = await fetch(`${HN_BASE_URL}/topstories.json`);
    const storyIds: number[] = await response.json();
    console.log(`Fetching ${storyIds.length} stories`);
    const storyDetailsPromises = storyIds.map(fetchStoryDetails);
    const allStories = (await Promise.all(storyDetailsPromises)).filter((story) => story !== null);

    for (const x of [...Array(fetchCountNr).keys()]) {
        await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    }

    console.log(`Ended now ${(new Date().getTime()) - start} ms later after fetching ${allStories.length} stories and doing ${fetchCountNr} dummy requests`);
    
    res.setHeader('x-vercel-dummy', "x".repeat(arrSizeNr));
    res.status(200).json({"size": arrSizeNr});
};
