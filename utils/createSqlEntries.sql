
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    color VARCHAR(50),
    img VARCHAR(255),
    slug VARCHAR(255) UNIQUE
);
INSERT INTO category (title, description, color, img, slug) VALUES
    ('Pastas', 'Embark on a culinary adventure with our exquisite selection of Italian pastas, each a handcrafted masterpiece ready to tantalize your taste buds.', 'white', '/categories/pastas.png', 'pastas'),
    ('Burgers', 'Forget the ordinary, crave the extraordinary! Dive into our world of authentic burgers, where every bite is a journey through bold flavors and fresh, premium ingredients.', 'red', '/categories/burgers.png', 'burgers'),
    ('Pizzas', 'Our pizzas are an explosion of flavor that will sing to your taste buds and dance on your tongue.', 'yellow', '/categories/pizzas.png', 'pizzas'),
    ('Drinks', 'Dive into a kaleidoscope of flavor with our drinks', 'black', '/categories/drinks.png', 'drinks'),
    ('Salads', 'Not just salads, but wellness on a plate!', 'green', '/categories/salads.png', 'salads');

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    img VARCHAR(255),
    available BOOLEAN,
    cat_slug VARCHAR(255),
    FOREIGN KEY (cat_slug) REFERENCES categories(slug)
);


INSERT INTO product (title, description, price, img, available, cat_slug) VALUES
    ('Classic Cheeseburger', 'A juicy beef patty topped with melted cheddar cheese, crispy lettuce, fresh tomato, and our signature sauce, served on a toasted bun.', 12.99, '/products/classic-cheeseburger.png', true, 'burgers'),
    ('Mushroom Swiss Burger', 'A juicy beef patty topped with sautéed mushrooms, melted Swiss cheese, caramelized onions, and creamy mayonnaise, served on a toasted brioche bun.', 14.5, '/products/mushroom-swiss-burger.png', true, 'burgers'),
    ('Black Bean Veggie Burger', 'A vegetarian option with a flavorful black bean patty, avocado slices, pico de gallo, roasted corn, and cilantro lime crema, served on a whole wheat bun.', 12.99, '/products/black-bean-veggie-burger.png', true, 'burgers'),
    ('Pizza Margherita', 'A classic pizza with a thin crust, fresh tomato sauce, mozzarella cheese, and basil leaves.', 14.99, '/products/pizza-margherita.png', true, 'pizzas'),
    ('Pizza Vegetarian', 'A delicious pizza loaded with fresh vegetables, mozzarella cheese, and a flavorful tomato sauce.', 13.99, '/products/pizza-vegetarian.png', true, 'pizzas'),
    ('Pizza Pepperoni', 'A traditional pizza loaded with savory pepperoni slices, mozzarella cheese, and our signature tomato sauce.', 13.99, '/products/pizza-pepperoni.png', true, 'pizzas'),
    ('Supreme Pizza', 'A feast for the senses with pepperoni, sausage, ham, green peppers, onions, mushrooms, and extra mozzarella cheese on our classic tomato sauce.', 16.99, '/products/pizza-supreme.png', true, 'pizzas'),
    ('Pizza Quattro Formaggi', 'A classic Italian pizza with four different cheeses: mozzarella, Parmesan, Fontina, and Gorgonzola.', 15.99, '/products/pizza-quattro-formaggi.png', true, 'pizzas'),
    ('Spaghetti Bolognese', 'Tender spaghetti noodles tossed in a hearty Bolognese sauce made with ground beef, tomatoes, and Italian herbs.', 11.99, '/products/spaghetti-bolognese.png', true, 'pastas'),
    ('Carbonara', 'Classic Roman pasta dish with creamy egg yolk, Parmesan cheese, pancetta, and black pepper, coating al dente spaghetti noodles.', 13.99, '/products/spaghetti-carbonara.png', true, 'pastas'),
    ('Seafood Marinara', 'A medley of fresh seafood, including mussels, clams, shrimp, and calamari, cooked in a flavorful tomato sauce with herbs, tossed with al dente spaghetti.', 15.99, '/products/spaghetti-seafood-marinara.png', false, 'pastas'),
    ('Pesto Spaghetti with Grilled Vegetables', 'Vibrant basil pesto sauce coats al dente spaghetti, topped with a colorful medley of grilled zucchini, eggplant, bell peppers, and cherry tomatoes.', 12.99, '/products/spaghetti-pesto-grilled-vegetables.png', true, 'pastas'),
    ('Greek Salad', 'A refreshing combination of romaine lettuce, cucumbers, tomatoes, Kalamata olives, red onion, feta cheese, and a tangy Greek vinaigrette.', 9.99, '/products/greek-salad.png', true, 'salads'),
    ('Southwest Chicken Salad', 'Grilled chicken strips tossed with romaine lettuce, black beans, corn, avocado slices, pico de gallo, cilantro lime crema, and a spicy chipotle dressing.', 12.99, '/products/southwest-chicken-salad.png', true, 'salads'),
    ('Caprese Salad', 'A classic Italian trio of fresh mozzarella slices, juicy tomatoes, and fragrant basil leaves drizzled with olive oil and balsamic vinegar.', 8.99, '/products/caprese-salad.png', true, 'salads'),
    ('Caesar Salad', 'Crisp romaine lettuce with Parmesan cheese, croutons, and our creamy Caesar dressing.', 8.99, '/products/caesar-salad.png', true, 'salads'),
    ('Rosemary Lemonade', 'A fresh twist on the classic, our homemade lemonade infused with fragrant rosemary sprigs, for a touch of herbal sweetness.', 6.5, '/products/rosemary-lemonade.webp', true, 'drinks'),
    ('Blood Orange Mojito', 'A tropical twist on the mojito, featuring muddled blood oranges, mint leaves, and rum, for a vibrant and citrusy cocktail.', 8.99, '/products/blood-orange-mojito.webp', true, 'drinks'),
    ('Spiced Iced Coffee', 'A smooth and creamy iced coffee infused with warm spices like cardamom and cinnamon, for a comforting and flavorful pick-me-up.', 5.5, '/products/spiced-iced-coffee.webp', true, 'drinks');


CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);


INSERT INTO employees (name, surname, email, password) VALUES
    ('jon', 'doe', 'donjoe@gmail.com', '123'),
    ('james', 'martin', 'jamesmartin@gmail.com', '111');


CREATE TABLE tables (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255) UNIQUE NOT NULL,
    available BOOLEAN NOT NULL DEFAULT true
);

INSERT INTO tables (title, available) VALUES
    ('table1', true),
    ('table2', true),
    ('table3', true),
    ('table4', true),
    ('table5', true),
    ('table6', true),
    ('table7', true),
    ('table8', true);
