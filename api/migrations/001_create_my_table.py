steps = [
    [
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name  VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(200) NOT NULL,
            hashed_password VARCHAR(200) NOT NULL
        );
        """,
        """
        DROP TABLE accounts;
        """
    ],



    [
        """
        CREATE TABLE categories (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(200) NOT NULL
        );
        """,
        """
        DROP TABLE categories;
        """
    ],
    [
        """
        CREATE TABLE budgets (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(200) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            budget INT NOT NULL,
            home_country VARCHAR(50) NOT NULL,
            destination_country VARCHAR(50) NULL,
            account_id INT REFERENCES accounts(id)
        );
        """,
        """
        DROP TABLE budgets;
        """
    ],
    [
        """
        CREATE TABLE recommendations (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(200) NOT NULL,
            price INT NOT NULL,
            image TEXT NULL,
            url TEXT NOT NULL,
            description TEXT NULL,
            category_id INT REFERENCES categories(id)

        );
        """,
        """
        DROP TABLE recommendations;
        """
    ],

    [
        """
        CREATE TABLE expenses (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(200) NOT NULL,
            date DATE NOT NULL,
            expense_total INT NOT NULL,
            description TEXT NULL,
            budget_id INT REFERENCES budgets(id),
            category_id INT REFERENCES categories(id)
        );
        """,
        """
        DROP TABLE expenses;
        """
    ]
]
