
#!/usr/bin/env python

"""
 * @file dbFill.py
 * Used in CS498RK MP4 to populate database with randomly generated users and tasks.
 *
 * @author Aswin Sivaraman
 * @date Created: Spring 2015
 * @date Modified: Spring 2015
"""

import sys
import getopt
import httplib
import urllib
import json
import random
from random import randint
from random import choice
from datetime import date
from time import mktime

def usage():
    print 'dbFill.py -u <baseurl> -p <port> -n <numUsers> -c <numChefs> -r <numRequests>'

def getUserNames(conn):
    conn.request("GET","""/api/users?filter={"name":1}""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)

    # Array of user IDs
    users = [str(d['data'][x]['_id']) for x in xrange(len(d['data']))]

    return users

def getUserIds(conn):
    # Retrieve the list of users
    conn.request("GET","""/api/users?filter={"_id":1}""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)

    # Array of user IDs
    users = [str(d['data'][x]['_id']) for x in xrange(len(d['data']))]

    return users

def getChefs(conn):
    conn.request("GET","""/api/chefs?filter={"_id":1}""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data);
    
    chefs = [str(d['data'][x]['_id']) for x in xrange(len(d['data']))]

    return chefs

def main(argv):

    # Server Base URL and port
    baseurl = "172.22.146.114"
    port = 8000

    # Number of POSTs that will be made to the server
    userCount = 150
    chefCount = 150
    requestCount = 1000
    try:
        opts, args = getopt.getopt(argv,"hu:p:n:c:",["url=","port=","users=","tasks="])
    except getopt.GetoptError:
        usage()
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
             usage()
             sys.exit()
        elif opt in ("-u", "--url"):
             baseurl = str(arg)
        elif opt in ("-p", "--port"):
             port = int(arg)
        elif opt in ("-n", "--users"):
             userCount = int(arg)
        elif opt in ("-c", "--chefs"):
             chefCount = int(arg)
        elif opt in ("-r", "--requests"):
             requestCount = int(art)

    # Python array containing common first names and last names
    firstNames = ["James","John","Robert","Michael","William","David","Richard","Charles","Joseph","Thomas","Christopher","Daniel","Paul","Mark","Donald","George","Kenneth","Steven","Edward","Brian","Ronald","Anthony","Kevin","Jason","Matthew","Gary","Timothy","Jose","Larry","Jeffrey","Frank","Scott","Eric","Stephen","Andrew","Raymond","Gregory","Joshua","Jerry","Dennis","Walter","Patrick","Peter","Harold","Douglas","Henry","Carl","Arthur","Ryan","Roger","Joe","Juan","Jack","Albert","Jonathan","Justin","Terry","Gerald","Keith","Samuel","Willie","Ralph","Lawrence","Nicholas","Roy","Benjamin","Bruce","Brandon","Adam","Harry","Fred","Wayne","Billy","Steve","Louis","Jeremy","Aaron","Randy","Howard","Eugene","Carlos","Russell","Bobby","Victor","Martin","Ernest","Phillip","Todd","Jesse","Craig","Alan","Shawn","Clarence","Sean","Philip","Chris","Johnny","Earl","Jimmy","Antonio","Danny","Bryan","Tony","Luis","Mike","Stanley","Leonard","Nathan","Dale","Manuel","Rodney","Curtis","Norman","Allen","Marvin","Vincent","Glenn","Jeffery","Travis","Jeff","Chad","Jacob","Lee","Melvin","Alfred","Kyle","Francis","Bradley","Jesus","Herbert","Frederick","Ray","Joel","Edwin","Don","Eddie","Ricky","Troy","Randall","Barry","Alexander","Bernard","Mario","Leroy","Francisco","Marcus","Micheal","Theodore","Clifford","Miguel","Oscar","Jay","Jim","Tom","Calvin","Alex","Jon","Ronnie","Bill","Lloyd","Tommy","Leon","Derek","Warren","Darrell","Jerome","Floyd","Leo","Alvin","Tim","Wesley","Gordon","Dean","Greg","Jorge","Dustin","Pedro","Derrick","Dan","Lewis","Zachary","Corey","Herman","Maurice","Vernon","Roberto","Clyde","Glen","Hector","Shane","Ricardo","Sam","Rick","Lester","Brent","Ramon","Charlie","Tyler","Gilbert","Gene"]
    lastNames = ["Smith","Johnson","Williams","Jones","Brown","Davis","Miller","Wilson","Moore","Taylor","Anderson","Thomas","Jackson","White","Harris","Martin","Thompson","Garcia","Martinez","Robinson","Clark","Rodriguez","Lewis","Lee","Walker","Hall","Allen","Young","Hernandez","King","Wright","Lopez","Hill","Scott","Green","Adams","Baker","Gonzalez","Nelson","Carter","Mitchell","Perez","Roberts","Turner","Phillips","Campbell","Parker","Evans","Edwards","Collins","Stewart","Sanchez","Morris","Rogers","Reed","Cook","Morgan","Bell","Murphy","Bailey","Rivera","Cooper","Richardson","Cox","Howard","Ward","Torres","Peterson","Gray","Ramirez","James","Watson","Brooks","Kelly","Sanders","Price","Bennett","Wood","Barnes","Ross","Henderson","Coleman","Jenkins","Perry","Powell","Long","Patterson","Hughes","Flores","Washington","Butler","Simmons","Foster","Gonzales","Bryant","Alexander","Russell","Griffin","Diaz","Hayes"]
    zipcodes = [61815, 61816, 61820, 61821, 61822, 61824, 61825, 61826, 61840, 61843, 61845, 61847, 61849, 61851, 61852, 60949, 61853, 61859, 61862, 61863, 61864, 61866, 61871, 61872, 61873, 61874, 61875, 61877,61878, 61880, 61801, 61802, 61803]

    # Server to connect to (1: url, 2: port number)
    conn = httplib.HTTPConnection(baseurl, port)
    # HTTP Headers
    headers = {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}

    # Array of user IDs
    user_pics = ["https://images.pexels.com/photos/101584/pexels-photo-101584.jpeg?h=350&auto=compress",
    "https://images.pexels.com/photos/26939/pexels-photo-26939.jpg?w=1260&h=750&auto=compress&cs=tinysrgb",
    "https://images.pexels.com/photos/119705/pexels-photo-119705.jpeg?h=350&auto=compress",
    "https://images.pexels.com/photos/211050/pexels-photo-211050.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb",
    "https://images.pexels.com/photos/108048/pexels-photo-108048.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"
    "https://images.pexels.com/photos/7077/man-people-office-writing.jpg?h=350&auto=compress"]
    # Loop 'userCount' number of times
    for i in xrange(userCount):
       # print "inside loop"
        # Pick a random first name and last name
        x = randint(0,99)
        y = randint(0,99)
        #pick a random zipcode
        z1 = randint(0,32)
        z2 = randint(0,32)
        while(z2==z1):
            z2 = randint(0,32)
        z3 = randint(0,32)
        while(z3==z2 or z3 == z1):
            z3 = randint(0,4)
        locations = [zipcodes[z1], zipcodes[z2], zipcodes[z3]]

        u - randint(0,5)
        user_pic = user_pics[u]
       # print locations;
        params = urllib.urlencode({'name': firstNames[x] + " " + lastNames[y], 'email': firstNames[x] + "@" + lastNames[y] + ".com", 'location[]': locations, 'password':"qwerty"}, True)
        # POST the user
        conn.request("POST", "/api/users", params, headers)
        response = conn.getresponse()
        data = response.read()
        d = json.loads(data)
        #print d
        # Store the users id
    userNames = getUserNames(conn);
    #print len(users)
    cuisines = ["American", "British", "Caribbean", "Chinese", "French", "Greek", "Indian", "Italian", "Japanese", "Mediterranean", "Mexican", "Moroccan", "Spanish", "Thai", "Turkish", "Vietnamese"]

    profile_pic = ["http://media.istockphoto.com/photos/professional-chef-in-a-commercial-kitchen-picture-id485609652",
    "http://media.istockphoto.com/photos/smiling-chef-in-his-kitchen-picture-id472290370",
    "http://media.istockphoto.com/photos/chef-completing-pasta-picture-id121127245",
    "http://media.istockphoto.com/photos/smiling-chefs-looking-at-camera-picture-id502293212",
    "http://media.istockphoto.com/photos/youve-found-the-best-restaurant-in-town-picture-id486860480",
    "http://media.istockphoto.com/photos/man-working-at-a-restaurant-picture-id507299470",
    "http://media.istockphoto.com/photos/professional-chef-picture-id465400717"] #put image links here


    food = ["http://www.freefoodphotos.com/imagelibrary/meals/slides/chorizo_cheese.jpg",
    "http://www.freefoodphotos.com/imagelibrary/meals/slides/pizza.jpg",
    "http://www.freefoodphotos.com/imagelibrary/meals/slides/creamy_chicken_tagliatelle.jpg",
    "http://www.freefoodphotos.com/imagelibrary/meals/slides/laksa.jpg",
    "http://www.freefoodphotos.com/imagelibrary/meals/slides/bento.jpg",
    "https://cdn.pixabay.com/photo/2016/11/17/17/19/pig-1832146_960_720.jpg",
    "https://images.pexels.com/photos/62097/pexels-photo-62097.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb",
    "https://images.pexels.com/photos/8500/food-dinner-pasta-spaghetti-8500.jpg?w=1260&h=750&auto=compress&cs=tinysrgb",
    "https://images.pexels.com/photos/7782/food-plate-wood-restaurant.jpg?w=1260&h=750&auto=compress&cs=tinysrgb",
    "https://images.pexels.com/photos/37352/food-japanese-asian.jpg?h=350&auto=compress",
    "https://images.pexels.com/photos/5944/food-lunch-mexican-nachos.jpg?w=1260&h=750&auto=compress&cs=tinysrgb"]

    descriptions = ["I am a chef who loves to cook.", "I'm great at cooking all types of meats.", "I cook for free so just send me a request!",
                    "I am a vegetarian chef.", "I am a gluten free chef."]
     # Array of user IDs
    chefIDs = []
    for i in xrange(chefCount):
        # Pick a random first name and last name
        x = randint(0,99)
        y = randint(0,99)
        #pick a random zipcode
        z = randint(0,32)
        p = randint(0,6)

        f1 = randint(0, 10)
        f2 = randint(0, 10)
        while(f2==f1):
            f2 = randint(0,10);
        f3 = randint(0,4)
        while(f3==f2 or f3 == f1):
            f3 = randint(0, 10)


        z1 = randint(0,32)
        z2 = randint(0,32)
        while(z2==z1):
            z2 = randint(0,32);
        z3 = randint(0,32)
        while(z3==z2 or z3 == z1):
            z3 = randint(0,32)

        c1 = randint(0,15)
        c2 = randint(0,15)
        while(c2==c1):
            c2 = randint(0,15);
        c3 = randint(0,15)
        while(c3==c2 or c3 == c1):
            c3 = randint(0,15)
        locations =[zipcodes[z1], zipcodes[z2], zipcodes[z3]]
        assignedUser = random.choice(userNames)
        #reviews = {"assignedUser": assignedUser, "rating": randint(1,2), "review": "chef was bad"}
        cuisines_array = [cuisines[c1], cuisines[c2], cuisines[c3]]
        carousel = [food[f1], food[f2], food[f3]]

        d = randint[0,4]
        description = descriptions[d]

        params = urllib.urlencode({'name': firstNames[x] + " " + lastNames[y], 'email': firstNames[x] + "@" + lastNames[y] + ".com", 'profile_pic' : profile_pic[p], "cuisines[]" : cuisines_array, 'location[]': locations, 'description': description, 'carousel[]':carousel, 'password': "qwerty"}, True)
        
        # POST the user
        conn.request("POST", "/api/chefs", params, headers)
        response = conn.getresponse()
        data = response.read()
        d = json.loads(data)
        #print d
        # Store the users id

    budget = [20, 30, 40, 50, 60, 70, 80, 90]
    payment = [20, 30, 40, 50, 60, 70, 80, 90]
    status = ["Pending", "Accepted", "Completed"]
    users = getUserIds(conn)
    chefs = getChefs(conn)
    for i in xrange(requestCount):

        # Randomly generate task parameters
        assignedUser = random.choice(users)
        assignedChef = random.choice(chefs)
        d = (mktime(date.today().timetuple()) + randint(86400,864000)) * 1000
        description = "I want to hire you"
        b = randint(0,7)
        p = randint(0,7)
        c = randint(0,15)
        s = randint(0,2)
        params = urllib.urlencode({'assignedUser': assignedUser, 'assignedChef': assignedChef, 'budget': budget[b], 'payment': payment[p], 'cuisine': cuisines[c], 'date': d, 'status': status[s], 'description': description})

        # POST the task
        conn.request("POST", "/api/requests", params, headers)
        response = conn.getresponse()
        data = response.read()
        d = json.loads(data)
    # Exit gracefully
    conn.close()
    print str(userCount)+" users and " + str(chefCount) + " chefs and " + str(requestCount) + " requests added at "+baseurl+":"+str(port)


if __name__ == "__main__":
     main(sys.argv[1:])